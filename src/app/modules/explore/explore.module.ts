import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExploreRoutingModule } from './explore-routing.module';
import { FeedComponent } from './pages/feed/feed.component';
import { FeaturedComponent } from './pages/featured/featured.component';
import { ComingSoonComponent } from '../../components/coming-soon/coming-soon.component';


@NgModule({
  imports: [
    CommonModule,
    ExploreRoutingModule
  ],
  declarations: [FeedComponent, FeaturedComponent, ComingSoonComponent]
})
export class ExploreModule { }
