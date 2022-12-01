
namespace DBVisualizer.Models
{
    public class Group 
    {
        public string? Name {get; set;}
        public string? DisplayName {get; set;}
        public string? Color {get; set;}
        public List<string>? TableNamesExactMatches {get; set;}
        public List<string>? TableNamesStartingWith {get; set;}
        public List<string>? TableNamesContaining {get; set;}
    }
}