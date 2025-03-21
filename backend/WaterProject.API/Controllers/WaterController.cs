using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class WaterController : ControllerBase
{
    private WaterDbContext _waterContext;
    
    public WaterController(WaterDbContext temp) => _waterContext = temp;

    [HttpGet(Name = "AllProjects")]
    public IActionResult GetProjects(int pageSize = 10, int pageNumber = 1)
    {
        string? favProjType = Request.Cookies["FavoriteProjectType"];
        Console.WriteLine("~~~~~~~~COOKIE~~~~~~~\n" + favProjType);
        
        
        HttpContext.Response.Cookies.Append("FavoriteProjectType", "Borehole Well and Hand Pump", new CookieOptions
        {
            HttpOnly = true, // not viewable by the DOM or JS
            Secure = true, // only transmitted over https
            SameSite = SameSiteMode.Strict, // Limits cookies from different domains 
            Expires = DateTimeOffset.Now.AddMinutes(1),
        });
        
        var allProjects = _waterContext.Projects
            .Skip(pageSize * (pageNumber - 1))
            .Take(pageSize)
            .ToList();
        
        var totalNumProjects = _waterContext.Projects.Count();

        var returnObj = new
        {
            allProjects,
            totalNumProjects
        };
        
        return Ok(returnObj);
    }

    [HttpGet(Name = "FunctionalProjects")]
    public IEnumerable<Project> GetFunctionalProjects()
    {
        var functionalProjects = _waterContext.Projects.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
        return functionalProjects;
    }
}