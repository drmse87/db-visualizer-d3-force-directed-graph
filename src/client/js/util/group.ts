import Group from '../interfaces/Group';

export default {
  getGroupIndexByNodeId(groups: Group[], nodeId: string): number | undefined {
    const indexOfGroupWithTableNameExactMatch = groups.findIndex(m => m.tableNamesExactMatches.some(t => nodeId === t));
    const indexOfGroupWithTableNameStartsWith = groups.findIndex(m => m.tableNamesStartingWith.some(t => new RegExp(`^${t}([A-Z0-9]\\w+)?$`).test(nodeId)));
    const indexOfGroupWithTableNameContains = groups.findIndex(m => m.tableNamesContaining.some(t => nodeId.includes(t)));

    if (indexOfGroupWithTableNameExactMatch > -1) {
      return indexOfGroupWithTableNameExactMatch;
    }
    else if (indexOfGroupWithTableNameStartsWith > -1) {
      return indexOfGroupWithTableNameStartsWith;
    }
    else if (indexOfGroupWithTableNameContains > -1) {
      return indexOfGroupWithTableNameContains;
    }
    else {
      return undefined;
    }
  },

  getGroupNameByNodeId(groups: Group[], nodeId: string) {
    const GroupIndex = this.getGroupIndexByNodeId(groups, nodeId);

    if (GroupIndex !== undefined) {
      return groups[GroupIndex].name;
    }
    else {
      return 'Unknown';
    }
  }
};