import React from 'react';
import { Badge } from '@grafana/ui';

// Not yet part of a published @grafana/data release, so the ID and the context type are declared
// here. Once Grafana ships them, use PluginExtensionPoints.CommandPaletteResultItem and
// PluginExtensionCommandPaletteResultItemV1Context from @grafana/data instead.
export const COMMAND_PALETTE_RESULT_ITEM_EXTENSION_POINT = 'grafana/commandpalette/result-item/v1';

export type CommandPaletteResultItemContext = {
  kind: 'dashboard';
  uid: string;
  title: string;
  url: string;
  tags: string[];
  folderTitle?: string;
};

export function DashboardOwnerBadge({ title }: CommandPaletteResultItemContext) {
  return <Badge text="Owner: Hello World" color="blue" tooltip={`Owner of ${title}`} />;
}
