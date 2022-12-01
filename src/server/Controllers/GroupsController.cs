using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using DBVisualizer.Models;

namespace DBVisualizer.Controllers;

[ApiController]
[Route("groups")]
public class GroupsController : ControllerBase
{
    private const string GroupsFileName = "groups.json";
    private readonly ApplicationDbContext _context;

    public GroupsController(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index()
    {
        if (!System.IO.File.Exists(GroupsFileName))
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Groups file error." });
        }

        using (FileStream openStream = System.IO.File.OpenRead(GroupsFileName))
        {
            var options = new JsonSerializerOptions 
            {
                PropertyNameCaseInsensitive = true
            };

            var groups =  await JsonSerializer.DeserializeAsync<List<Group>>(openStream, options);

            return Ok(groups);
        }
    }
}