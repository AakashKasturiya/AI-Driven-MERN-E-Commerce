const getStatusLabel = (user) => {
  if (user.isBlocked) return { label: "Blocked", classes: "bg-red-100 text-red-700" };
  if (!user.isVerified) return { label: "Pending", classes: "bg-amber-100 text-amber-700" };
  return { label: "Active", classes: "bg-emerald-100 text-emerald-700" };
};

const getInitials = (name) => {
  if (!name) return "";
  const parts = name.trim().split(" ");
  return parts.length > 1
    ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    : `${parts[0][0] ?? ""}`.toUpperCase();
};

export const UserPreview = ({ user, onClose }) => {
  const status = getStatusLabel(user);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="relative bg-white border border-background-200/70 rounded-2xl w-full max-w-sm p-6 animate-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground-950 font-heading">User Details</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-400 hover:bg-background-100 hover:text-foreground-600 transition-colors cursor-pointer"
          >
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-close-line text-lg"></i>
            </span>
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mb-3 overflow-hidden">
            {user.profileImage ? (
              <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-bold text-primary-600">{getInitials(user.name)}</span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-foreground-950">{user.name}</h3>
          <p className="text-sm text-foreground-500">{user.email}</p>
        </div>

        <div className="space-y-3 border-t border-background-200/70 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground-500">User ID</span>
            <span className="text-sm font-medium text-foreground-900">{user._id}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground-500">Role</span>
            <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize bg-secondary-100 text-secondary-700">
              {user.role}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground-500">Status</span>
            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${status.classes}`}>
              {status.label}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground-500">Verified</span>
            <span className="text-sm font-medium text-foreground-900">{user.isVerified ? "Yes" : "No"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground-500">Blocked</span>
            <span className="text-sm font-medium text-foreground-900">{user.isBlocked ? "Yes" : "No"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground-500">Joined</span>
            <span className="text-sm font-medium text-foreground-900">{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground-500">Last Updated</span>
            <span className="text-sm font-medium text-foreground-900">{new Date(user.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
