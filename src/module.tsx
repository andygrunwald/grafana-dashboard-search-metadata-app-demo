import { AppPlugin } from '@grafana/data';
import {
  COMMAND_PALETTE_RESULT_ITEM_EXTENSION_POINT,
  DashboardSearchMetadata,
} from './components/DashboardSearchMetadata/DashboardSearchMetadata';

export const plugin = new AppPlugin<{}>().addComponent({
  title: 'Dashboard search metadata',
  description: "Shows dashboard tags and the owning team on dashboard rows in Grafana's search",
  targets: [COMMAND_PALETTE_RESULT_ITEM_EXTENSION_POINT],
  component: DashboardSearchMetadata,
});
