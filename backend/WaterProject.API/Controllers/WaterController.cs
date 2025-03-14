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
    public IEnumerable<Project> GetProjects()
    {
        var allProjets = _waterContext.Projects.ToList();
        return allProjets;
    }

    [HttpGet(Name = "FunctionalProjects")]
    public IEnumerable<Project> GetFunctionalProjects()
    {
        var functionalProjects = _waterContext.Projects.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
        return functionalProjects;
    }
}