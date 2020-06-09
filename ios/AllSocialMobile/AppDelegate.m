/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTLog.h>
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTUtils.h>
#import <RNSplashScreen.h>
#import <RNBranch/RNBranch.h>
#import <Appboy-iOS-SDK/ABKPushUtils.h>
#import <Appboy-iOS-SDK/AppboyKit.h>
#import <CodePush/CodePush.h>
#import "Orientation.h"

@import Firebase;


#ifdef DEBUG
static NSString *const AppboyApiKey = @"57c63fc3-b07b-420f-87c1-5253da0b4448";
#else
static NSString *const AppboyApiKey = @"f28c0892-6c02-4502-a7e3-92eea526ea66";
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTSetLogThreshold(RCTLogLevelInfo);
  RCTSetLogFunction(ReactLogFunction);
  [FIRApp configure];
  // [RNBranch useTestInstance];
  [RNBranch delayInitToCheckForSearchAds];
  [RNBranch initSessionWithLaunchOptions:launchOptions isReferrable:YES];
  
  // Configure Braze Push Notification
  [self configureBraze:application didFinishLaunchingWithOptions:launchOptions];
  
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"AllSocialMobile"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [RNSplashScreen show];
  [self setupVideoFullScreenEvent];
  
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [CodePush bundleURL];
#endif
}

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}
  
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  if (![RNBranch.branch application:app openURL:url options:options]) {
    // do other deep link routing for the Facebook SDK, Pinterest SDK, etc
  }
  return YES;
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *restorableObjects))restorationHandler {
  return [RNBranch continueUserActivity:userActivity];
}

# pragma mark - Braze Configure
- (void)configureBraze:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  NSMutableDictionary *appboyOptions = [NSMutableDictionary dictionary];
  appboyOptions[ABKRequestProcessingPolicyOptionKey] = @(ABKAutomaticRequestProcessing);
  appboyOptions[ABKMinimumTriggerTimeIntervalKey] = @(5);
  
  NSLog(@"Setting ABKInAppMessageControllerDelegate for app run.");
  appboyOptions[ABKInAppMessageControllerDelegateKey] = self;
  appboyOptions[ABKURLDelegateKey] = self;
  appboyOptions[ABKPushStoryAppGroupKey] = @"group.com.allsocial.app";
  
  [Appboy requestEnableSDKOnNextAppRun];
  
  // Starts up Braze, opening a new session and causing an updated in-app message/feed to be requested.
  [Appboy startWithApiKey:AppboyApiKey
            inApplication:application
        withLaunchOptions:launchOptions
        withAppboyOptions:appboyOptions];
  
  [self setUpRemoteNotification];
  
  NSLog(@"Appboy device identifier is %@", [[Appboy sharedInstance] getDeviceId]);
}

// Pass the deviceToken to Braze as well
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  NSLog(@"In application:didRegisterForRemoteNotificationsWithDeviceToken, token is %@", [NSString stringWithFormat:@"%@", deviceToken]);
  [[Appboy sharedInstance] registerDeviceToken:deviceToken];
  [[NSNotificationCenter defaultCenter] postNotificationName:@"deviceToken" object:nil userInfo:@{@"token": [NSString stringWithFormat:@"%@", deviceToken]}];
}

// When a notification is received, pass it to Braze. If the notification is received when the app
// is in the background, Braze will try to fetch the news feed, and call completionHandler after
// the request finished; otherwise, Appboy won't fetch the news feed, nor call the completionHandler.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
//  if ([ABKPushUtils isUninstallTrackingRemoteNotification:userInfo]) {
//    NSLog(@"Got uninstall tracking push from Braze");
//  } else if ([ABKPushUtils isGeofencesSyncRemoteNotification:userInfo]) {
//    NSLog(@"Got geofences sync push from Braze.");
//  }
  [[Appboy sharedInstance] registerApplication:application didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
  NSLog(@"Application delegate method didReceiveRemoteNotification:fetchCompletionHandler: is called with user info: %@", userInfo);
  
  if ([ABKPushUtils isAppboyRemoteNotification:userInfo] && ![ABKPushUtils isAppboyInternalRemoteNotification:userInfo]) {
    [UIApplication sharedApplication].applicationIconBadgeNumber = 0;
    NSLog(@"Remote notification was sent from Braze, clearing badge number.");
    
    [[NSNotificationCenter defaultCenter] postNotificationName:@"remoteNotification" object:nil userInfo:RCTNullIfNil(RCTJSONClean(userInfo))];
  }
}

- (void)application:(UIApplication *)application handleActionWithIdentifier:(NSString *)identifier forRemoteNotification:(NSDictionary *)userInfo completionHandler:(void (^)())completionHandler {
  NSLog(@"application:handleActionWithIdentifier:forRemoteNotification:completionHandler: with identifier %@", identifier);
  [[Appboy sharedInstance] getActionWithIdentifier:identifier forRemoteNotification:userInfo completionHandler:completionHandler];
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  /*
   Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
   */
  NSLog(@"applicationDidBecomeActive:(UIApplication *)application");
  [UIApplication sharedApplication].applicationIconBadgeNumber = 0;
  if (isBackground) {
    [self setUpRemoteNotification];
    [self setupVideoFullScreenEvent];
  }
  isBackground = NO;
  
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
  isBackground = YES;
  [[NSNotificationCenter defaultCenter] removeObserver:self name:UIWindowDidBecomeVisibleNotification object:self.window];
  [[NSNotificationCenter defaultCenter] removeObserver:self name:UIWindowDidBecomeHiddenNotification object:self.window];
}

- (void) setupVideoFullScreenEvent {
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(VideoExitFullScreen:)
                                               name:UIWindowDidBecomeVisibleNotification
                                             object:self.window];
  
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(VideoEnterFullScreen:)
                                               name:UIWindowDidBecomeHiddenNotification
                                             object:self.window];
}

- (void) VideoEnterFullScreen: (NSNotification *) notification {
  [[NSNotificationCenter defaultCenter] postNotificationName:@"VideoEnterFullScreen" object:nil userInfo:nil];
}

- (void) VideoExitFullScreen: (NSNotification *) notification {
  [[NSNotificationCenter defaultCenter] postNotificationName:@"VideoExitFullScreen" object:nil userInfo:nil];
}

# pragma mark - Braze Push Registration

- (void) setupRemoteNotificationForiOS8And9 {
  // Adding Braze default categories
  NSMutableSet *categories = [NSMutableSet setWithSet:[ABKPushUtils getAppboyUIUserNotificationCategorySet]];
  
  UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:(UIUserNotificationTypeBadge | UIUserNotificationTypeAlert | UIUserNotificationTypeSound) categories:categories];
  [[UIApplication sharedApplication] registerForRemoteNotifications];
  [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
  
  [[NSNotificationCenter defaultCenter] postNotificationName:@"pushNotificationStatus" object:nil userInfo:@{@"status": @"1"}];
}

- (void) setupRemoteNotificationForiOS10 {
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  UNAuthorizationOptions options = UNAuthorizationOptionAlert | UNAuthorizationOptionSound | UNAuthorizationOptionBadge;
  //  if (@available(iOS 12.0, *)) {
  //    options = options | UNAuthorizationOptionProvisional;
  //  }
  
  // Adding Braze default categories
  NSMutableSet *categories = [NSMutableSet setWithSet:[ABKPushUtils getAppboyUNNotificationCategorySet]];
  [center setNotificationCategories:categories];
  
  [center requestAuthorizationWithOptions:(options)
                        completionHandler:^(BOOL granted, NSError * _Nullable error) {
                          NSLog(@"Permission granted.");
                          [[Appboy sharedInstance] pushAuthorizationFromUserNotificationCenter:granted];
                          if (granted) {
                            dispatch_async(dispatch_get_main_queue(), ^{
                              [[UIApplication sharedApplication] registerForRemoteNotifications];
                            });
                          }
                          
                          [[NSNotificationCenter defaultCenter] postNotificationName:@"pushNotificationStatus" object:nil userInfo:@{@"status": granted ? @"1" : @"0"}];
                        }];
  center.delegate = self;
}

- (void) setUpRemoteNotification {
  if (floor(NSFoundationVersionNumber) > NSFoundationVersionNumber_iOS_9_x_Max) {
    [self setupRemoteNotificationForiOS10];
  } else {
    [self setupRemoteNotificationForiOS8And9];
  }
}

# pragma mark - UNUserNotificationCenterDelegate

- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler {
  NSLog(@"Application delegate method userNotificationCenter:willPresentNotification:withCompletionHandler: is called.");
  if (isBackground) {
    if ([ABKPushUtils isAppboyRemoteNotification:notification.request.content.userInfo]) {
      [[NSNotificationCenter defaultCenter] postNotificationName:@"remoteNotification" object:nil userInfo:RCTNullIfNil(RCTJSONClean(notification.request.content.userInfo))];
    }
    completionHandler(UNNotificationPresentationOptionAlert);
  }
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler {
  //  response.notification.request.content.userInfo[@"ab_uri"] = @"";
  [[Appboy sharedInstance] userNotificationCenter:center didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
  NSLog(@"Application delegate method userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler: is called with user info: %@", response.notification.request.content.userInfo);
  
  if ([ABKPushUtils isAppboyUserNotification:response]) {
    [UIApplication sharedApplication].applicationIconBadgeNumber = 0;
    NSLog(@"User notification was sent from Braze, clearing badge number.");
    
    [[NSNotificationCenter defaultCenter] postNotificationName:@"notificationClicked" object:nil userInfo:RCTNullIfNil(RCTJSONClean(response.notification.request.content.userInfo))];
  }
}

#pragma mark - ABKInAppMessageControllerDelegate

- (ABKInAppMessageDisplayChoice)beforeInAppMessageDisplayed:(ABKInAppMessage *)inAppMessage {
  NSLog(@"beforeInAppMessageDisplayed: delegate called in AllSocial. Returning ABKDisplayInAppMessageNow.");
  return ABKDisplayInAppMessageNow;
}

#pragma mark - ABKURLDelegate

- (BOOL)handleAppboyURL:(NSURL *)url fromChannel:(ABKChannel)channel withExtras:(NSDictionary *)extras {
  return YES;
}

RCTLogFunction ReactLogFunction = ^(
                                    RCTLogLevel level,
                                    __unused RCTLogSource source,
                                    NSString *fileName,
                                    NSNumber *lineNumber,
                                    NSString *message
                                    )
{
  NSString *log = RCTFormatLog([NSDate date], level, fileName, lineNumber, message);
  
#ifdef DEBUG
  fprintf(stderr, "%s\n", log.UTF8String);
  fflush(stderr);
#else
  CLS_LOG(@"REACT LOG: %s", log.UTF8String);
#endif

};

@end

