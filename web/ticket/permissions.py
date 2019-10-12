from rest_framework.permissions import BasePermission

class IsAssignedUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        print(obj, request.user, obj.assigned_by, obj.assigned_to)
        if request.user and request.user.pk in [obj.assigned_to.pk, obj.assigned_by.pk]:
            return True
        return False