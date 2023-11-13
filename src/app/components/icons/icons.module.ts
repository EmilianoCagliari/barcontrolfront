import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import {
  IconHome,
  IconBottle,
  IconLogout,
  IconSettings,
  IconReportAnalytics,
  IconScaleOutline,
  IconScaleOutlineOff,
  IconBell,
  IconUserCircle,
  IconChevronDown,
  IconExclamationCircle,
  IconEditCircle,
  IconTrash,
  IconDeviceFloppy,
  IconChevronLeft,
  IconChevronRight,
  IconAsset,
  IconFocusCentered,
  IconCamera,
  IconCameraOff
} from 'angular-tabler-icons/icons';




//https://www.npmjs.com/package/angular-tabler-icons
// Select some icons (use an object, not an array)
const icons = {
  IconHome,
  IconBottle,
  IconLogout,
  IconSettings,
  IconReportAnalytics,
  IconScaleOutline,
  IconScaleOutlineOff,
  IconBell,
  IconUserCircle,
  IconChevronDown,
  IconExclamationCircle,
  IconEditCircle,
  IconTrash,
  IconDeviceFloppy,
  IconChevronLeft,
  IconChevronRight,
  IconAsset,
  IconFocusCentered,
  IconCamera,
  IconCameraOff
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TablerIconsModule.pick(icons)
  ],
  exports: [
    TablerIconsModule
  ]
})
export class IconsModule { }
