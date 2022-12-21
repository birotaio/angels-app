#! /bin/sh
echo "Sending DsYMs to Firebase"

../ios/Pods/FirebaseCrashlytics/upload-symbols -gsp ../ios/GoogleService-Info.plist -p ios ./260f0742-b5de-308f-b4ee-20b8d1939fe7.dSYM
