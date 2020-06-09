package com.allsocial.app.notification;

import android.app.ActivityManager;
import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import com.allsocial.app.MainActivity;
import com.appboy.push.AppboyNotificationUtils;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;

import java.util.List;

import me.leolin.shortcutbadger.ShortcutBadger;

import static android.content.Context.ACTIVITY_SERVICE;

public class AppboyBroadcastReceiver extends BroadcastReceiver {

    public static final String PUSH_OPENED = "com.allsocial.app.push_opened";

    @Override
    public void onReceive(Context context, Intent intent) {
        Bundle bundle = intent.getExtras();
        if (bundle == null) {
            return;
        }

        Log.d("PUSH_TEST", bundle.toString());

        String packageName = context.getPackageName();
        String pushReceivedAction = packageName + AppboyNotificationUtils.APPBOY_NOTIFICATION_RECEIVED_SUFFIX;
        String notificationOpenedAction = packageName + AppboyNotificationUtils.APPBOY_NOTIFICATION_OPENED_SUFFIX;

        String action = intent.getAction();
        if (pushReceivedAction.equals(action)) {
            if (isApplicationInForeground(context)) {
                ShortcutBadger.removeCount(context);
                NotificationManager notificationManager = (NotificationManager) context.getSystemService(context.NOTIFICATION_SERVICE);
                notificationManager.cancelAll();
            } else {
                Bundle extra = bundle.getBundle("extra");
                if (extra == null) {
                    return;
                }

                String badge = extra.getString("badge", "0");
                int badgeCount = Integer.parseInt(badge);
                if (badgeCount == 0) {
                    ShortcutBadger.removeCount(context);
                } else {
                    ShortcutBadger.applyCount(context, badgeCount);
                }
            }
        } else if (notificationOpenedAction.equals(action)) {
            Handler handler = new Handler(Looper.getMainLooper());
            handler.post(new Runnable() {
                public void run() {
                    // Construct and load our normal React JS code bundle
                    ReactInstanceManager mReactInstanceManager = ((ReactApplication) context.getApplicationContext()).getReactNativeHost().getReactInstanceManager();
                    ReactContext rnContext = mReactInstanceManager.getCurrentReactContext();
                    // If it's constructed, send a notification
                    if (rnContext != null) {
                        if (!isApplicationInForeground(rnContext)) {
                            Intent activityIntent = new Intent(rnContext.getApplicationContext(), MainActivity.class);
                            activityIntent.addFlags(Intent.FLAG_ACTIVITY_BROUGHT_TO_FRONT | Intent.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED | Intent.FLAG_ACTIVITY_NEW_TASK);
                            activityIntent.putExtra("push_notification", bundle);
                            rnContext.getApplicationContext().startActivity(activityIntent);
                        } else {
                            RNPushNotificationJsDelivery jsDelivery = new RNPushNotificationJsDelivery((ReactApplicationContext) rnContext);
                            jsDelivery.notifyOpenedNotification(bundle);
                        }
                    } else {
                        // Otherwise wait for construction, then send the notification
                        mReactInstanceManager.addReactInstanceEventListener(context1 -> {
                            Intent activityIntent = new Intent(context, MainActivity.class);
                            activityIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                            activityIntent.putExtra("push_notification", bundle);
                            context.startActivity(activityIntent);
                        });

                        if (!mReactInstanceManager.hasStartedCreatingInitialContext()) {
                            // Construct it in the background
                            mReactInstanceManager.createReactContextInBackground();
                        }
                    }
                }
            });
        }
    }

    private boolean isApplicationInForeground(Context context) {
        ActivityManager activityManager = (ActivityManager) context.getSystemService(ACTIVITY_SERVICE);
        List<ActivityManager.RunningAppProcessInfo> processInfos = activityManager.getRunningAppProcesses();
        if (processInfos != null) {
            for (ActivityManager.RunningAppProcessInfo processInfo : processInfos) {
                if (processInfo.processName.equals(context.getPackageName())) {
                    if (processInfo.importance == ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND) {
                        for (String d : processInfo.pkgList) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
}
