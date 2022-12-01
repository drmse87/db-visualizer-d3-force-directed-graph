using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DBVisualizer.Models;

namespace DBVisualizer.Controllers;

[ApiController]
[Route("graph-data")]
public class GraphDataController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public GraphDataController(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index()
    {
        if (_context.Links == null || _context.Nodes == null)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { message = "DB error." });
        }

        var links = await _context.Links
            .FromSqlRaw(@"
                SELECT object_name(parent_object_id) source, object_name(referenced_object_id) target
                FROM sys.foreign_keys
                ORDER BY source")
            .ToListAsync();
        var nodes = await _context.Nodes
            .FromSqlRaw(@"
                SELECT name AS id, STRING_AGG(C.COLUMN_NAME + ' (' + C.DATA_TYPE + ')', ', ') AS columns, T.modify_date AS modified, T.create_date AS created
                FROM sys.tables AS T
                LEFT JOIN (SELECT * FROM INFORMATION_SCHEMA.COLUMNS) AS C ON name = C.TABLE_NAME
                GROUP BY name, modify_date, create_date")
            .ToListAsync();

        return Ok(new GraphData {
            Links = links,
            Nodes = nodes
        });
    }
}