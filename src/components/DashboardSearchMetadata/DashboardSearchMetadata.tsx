import React from 'react';
import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { Badge, TagList, useStyles2 } from '@grafana/ui';
import { getOwnerTeam } from './owner';

// Not yet part of a published @grafana/data release, so the ID and the context type are declared
// here. Once Grafana ships them, use PluginExtensionPoints.CommandPaletteResultItem and
// PluginExtensionCommandPaletteResultItemV1Context from @grafana/data instead.
export const COMMAND_PALETTE_RESULT_ITEM_EXTENSION_POINT = 'grafana/commandpalette/result-item/v1';

export type CommandPaletteResultItemContext = {
  kind: 'dashboard';
  uid: string;
  title: string;
  url: string;
  // undefined when the search source doesn't provide tags (e.g. Grafana's experimental hybrid search)
  tags?: string[];
  folderTitle?: string;
};

export function DashboardSearchMetadata({ uid, title, tags }: CommandPaletteResultItemContext) {
  const styles = useStyles2(getStyles);

  return (
    <div className={styles.wrapper}>
      {tags && tags.length > 0 && <TagList tags={tags} displayMax={3} className={styles.tagList} />}
      <Badge text={`Owner: ${getOwnerTeam(uid)}`} color="blue" tooltip={`Owner of ${title}`} />
    </div>
  );
}

const getStyles = (theme: GrafanaTheme2) => ({
  // Keep everything on the row's single line so the command palette's virtualized list keeps its row height
  wrapper: css({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    flexShrink: 0,
    marginLeft: 'auto',
  }),
  tagList: css({
    flexWrap: 'nowrap',
  }),
});
