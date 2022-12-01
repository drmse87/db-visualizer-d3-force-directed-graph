
using Microsoft.EntityFrameworkCore;

namespace DBVisualizer.Models
{
    [Keyless]
    public class GraphNode 
    {
        public string? Id {get; set;}
        public string? Columns {get; set;}
        public DateTime Modified {get; set;}
        public DateTime Created {get; set;}
    }
}