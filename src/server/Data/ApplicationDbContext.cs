using Microsoft.EntityFrameworkCore;
using DBVisualizer.Models;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {        
    }

    public DbSet<GraphLink>? Links { get; set; }
    public DbSet<GraphNode>? Nodes { get; set; }
}