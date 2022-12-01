export default interface Group {
    name: string,
    displayName: string,
    color: string,
    tableNamesStartingWith: string[],
    tableNamesContaining: string[],
    tableNamesExactMatches: string[]
}