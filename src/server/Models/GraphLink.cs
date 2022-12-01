
using Microsoft.EntityFrameworkCore;

namespace DBVisualizer.Models
{
    [Keyless]
    public class GraphLink 
    {
        public string? Source {get; set;}
        public string? Target {get; set;}

    }
}
