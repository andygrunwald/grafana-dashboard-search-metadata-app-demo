import React, { Suspense, lazy } from 'react';
import { AppPlugin } from '@grafana/data';
import { LoadingPlaceholder } from '@grafana/ui';
import type { AppConfigProps } from './components/AppConfig/AppConfig';
import {
  COMMAND_PALETTE_RESULT_ITEM_EXTENSION_POINT,
  DashboardOwnerBadge,
} from './components/DashboardOwnerBadge/DashboardOwnerBadge';

const App = lazy(() => import('./components/App/App'));
const LazyAppConfig = lazy(() => import('./components/AppConfig/AppConfig'));

const AppConfig = (props: AppConfigProps) => (
  <Suspense fallback={<LoadingPlaceholder text="" />}>
    <LazyAppConfig {...props} />
  </Suspense>
);

export const plugin = new AppPlugin<{}>()
  .setRootPage(App)
  .addConfigPage({
    title: 'Configuration',
    icon: 'cog',
    body: AppConfig,
    id: 'configuration',
  })
  .addComponent({
    title: 'Dashboard owner',
    description: 'Shows a hello world owner on dashboard rows in the command palette',
    targets: [COMMAND_PALETTE_RESULT_ITEM_EXTENSION_POINT],
    component: DashboardOwnerBadge,
  });
