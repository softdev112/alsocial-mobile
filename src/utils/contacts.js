import Contacts from "react-native-contacts";

export const InviteType = {
    email: 0,
    message: 1,
};

export function showShield(permissionIsGranted, showBottomSheet) {
    const options = permissionIsGranted
        ? ["Mail", "Message", "More", "Cancel"]
        : ["More", "Cancel"];
    const cancelButtonIndex = permissionIsGranted ? 3 : 1;
    return new Promise(resolve =>
        showBottomSheet(
            {
                options,
                cancelButtonIndex,
            },
            buttonIndex => resolve(buttonIndex),
        ),
    );
}

export function checkPermission() {
    return new Promise(resolve => {
        Contacts.check((error, permission) => {
            if (error) {
                throw error;
            } else {
                if (permission === "undefined") {
                    Contacts.request((err, contactsPermission) => {
                        if (error) {
                            throw error;
                        } else {
                            resolve(contactsPermission);
                        }
                    });
                } else {
                    resolve(permission);
                }
            }
        });
    });
}

export function getContacts() {
    return new Promise(resolve => {
        Contacts.getAll((error, contacts) => {
            if (!contacts || error) {
                resolve([]);
            } else {
                resolve(contacts);
            }
        });
    });
}
