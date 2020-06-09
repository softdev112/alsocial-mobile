/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <UserNotifications/UserNotifications.h>
#import <Appboy-iOS-SDK/ABKInAppMessageControllerDelegate.h>
#import <Appboy-iOS-SDK/ABKURLDelegate.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate, ABKInAppMessageControllerDelegate, ABKURLDelegate> {
  BOOL isBackground;
}

@property (nonatomic, strong) UIWindow *window;

@end
