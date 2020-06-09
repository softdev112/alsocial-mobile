//
//  NotificationManager.m
//  AllSocialMobile
//
//  Created by Mobdev125 on 5/13/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNPushNotification.h"

@implementation RNPushNotification

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
  return @[@"remoteNotificationDeviceToken", @"remoteNotificationReceived", @"notificationActionOpened", @"pushNotificationStatus", @"VideoExitFullScreen", @"VideoEnterFullScreen"];
}

- (void)startObserving {
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(deviceToken:) name:@"deviceToken" object:nil];
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(remoteNotification:) name:@"remoteNotification" object:nil];
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(notificationClicked:) name:@"notificationClicked" object:nil];
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(pushNotificationStatus:) name:@"pushNotificationStatus" object:nil];
  
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(VideoExitFullScreen:) name:@"VideoExitFullScreen" object:nil];
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(VideoEnterFullScreen:) name:@"VideoEnterFullScreen" object:nil];
}

- (void)stopObserving {
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)deviceToken:(NSNotification*) notification {
  NSString *token = notification.userInfo[@"token"];
  [self sendEventWithName:@"remoteNotificationDeviceToken" body:@{@"deviceToken": token}];
}

- (void)remoteNotification:(NSNotification*) notification {
  [self sendEventWithName:@"remoteNotificationReceived" body:@{@"dataJSON": notification.userInfo}];
}

- (void)notificationClicked:(NSNotification*) notification {
  [self sendEventWithName:@"notificationActionOpened" body:@{@"dataJSON": notification.userInfo}];
}

- (void)pushNotificationStatus:(NSNotification*) notification {
  [self sendEventWithName:@"pushNotificationStatus" body:@{@"dataJSON": notification.userInfo}];
}

- (void) VideoEnterFullScreen: (NSNotification *) notification {
  [self sendEventWithName:@"VideoEnterFullScreen" body:@{@"dataJSON": @"VideoEnterFullScreen"}];
}

- (void) VideoExitFullScreen: (NSNotification *) notification {
  [self sendEventWithName:@"VideoExitFullScreen" body:@{@"dataJSON": @"VideoExitFullScreen"}];
}

@end
