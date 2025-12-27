import { useAuth0 } from "@auth0/auth0-react";

let img = "https://d.ibtimes.co.uk/en/full/1730659/elon-musk-tesla-optimus.jpg?w=736&f=c81768e7ce1d04a8ab2b362aa77abf24";

function Account() {
  /*
    useAuth0 hook provides authentication state and methods
    - isloading for loadind state
    - isAuthenticated to check if user is logged in
    - user object with user details
    - loginWithPopup method to log in
    - logout method to log out
  */
  const { loginWithPopup, isAuthenticated, user, logout, isLoading } = useAuth0();

  if (isLoading) {
      return (
          <div className="flex items-center gap-3 mb-6 w-full animate-pulse">
              <div className="w-10 h-10 rounded-full bg-gray-600 shrink-0 "></div>
              
              <div className="h-4 w-24 rounded-full bg-gray-600 text-sm"></div>
              
              <div className="ml-auto w-16 h-4 rounded-full bg-gray-600"></div>
          </div>
      );
  }

    return (
        <div className="flex items-center gap-3 mb-6 w-full">
            <div
                className="w-10 h-10 rounded-full bg-cover bg-center shrink-0"
                style={{ backgroundImage: `url(${user?.picture || img})` }}
            ></div>

            <span className="text-white font-medium">
                {isAuthenticated ? user?.name : "Guest"}
            </span>

            <div className="ml-auto">
                {!isAuthenticated ? (
                    <button onClick={() => loginWithPopup()} className="block">
                        <div className="inline-flex items-center rounded-full bg-lime-600 px-3 py-1 text-xs font-semibold text-white hover:bg-lime-500 transition-colors">
                            Login
                        </div>
                    </button>
                ) : (
                    <button 
                        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                        className="block"
                    >
                        <div className="inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-500 transition-colors">
                            Logout
                        </div>
                    </button>
                )}
            </div>
        </div>
    );
}

export default Account;