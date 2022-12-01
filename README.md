# DB Visualizer
DB Visualizer is a simple web app visualizing a SQL database with all of its tables and dependencies. It also has grouping, search and filter functionality. The app was built with [D3 force-directed graph](https://observablehq.com/@d3/force-directed-graph), TypeScript, ASP.NET Core and Sass.

# Get started
## Develop
1. `npm install`
2. `cd src/server`
3. Set development user-secrets (for connecting to database):  
   * `dotnet user-secrets set "DbDataSource" "VALUE"  `
   * `dotnet user-secrets set "DbInitialCatalog" "VALUE" --id 9e43861b-b222-42fe-beff-2be0c4e0cc0a`
   * `dotnet user-secrets set "DbUser" "VALUE" --id 9e43861b-b222-42fe-beff-2be0c4e0cc0a`
   * `dotnet user-secrets set "DbPassword" "VALUE" --id 9e43861b-b222-42fe-beff-2be0c4e0cc0a`
4. `npm run dev`

## Publish
1. Production connection string is currently read from appsettings.Production.json, consider doing it in a safer manner.
2. `npm run publish`
3. Copy release folder to (.NET capable) hosting environment.