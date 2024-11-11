import Account from '~/pages/Account';
import HomePage from '~/pages/HomePage';
import Channel from '~/pages/Channel';
import Video from '~/pages/Video';
import Short from '~/pages/Short';
import { History, Clip, Library, Like,  Playlist, Subscriptions, Download, MyVideo } from '~/pages/Feed';
import { Trending, Sport, News, Music, Gaming } from '~/pages/Trend';
import { VideoLayout } from '~/components/Layout/index';

var publicRoutes = [
  { path: '/', component: HomePage },
  { path: '/account', component: Account },
  { path: `/shorts`, component: Short },
  { path: '/channel/:id', component: Channel },
  { path: `/watch/:videoId`, layout: VideoLayout, component: Video },
  {
    path: '/feed',
    deepPath: [
      { path: '/history', component: History },
      { path: '/myvideo', component: MyVideo },
      { path: '/playlist', component: Playlist },
      { path: '/subscriptions', component: Subscriptions },
      { path: '/like', component: Like },
      { path: '/library', component: Library },
      { path: '/downloads', component: Download },
      { path: '/clips', component: Clip },
    ],
  },
  { path: `/trending`, component: Trending },
  { path: `/sport`, component: Sport },
  { path: `/news`, component: News },
  { path: `/music`, component: Music },
  { path: `/gaming`, component: Gaming },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
