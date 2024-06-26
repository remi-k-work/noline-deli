// import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";

// const AuthContext = createContext(undefined);

// export const useAuth = () => {
//   const authContext = useContext(AuthContext);

//   if (!authContext) {
//     throw new Error("useAuth must be used within a AuthProvider");
//   }

//   return authContext;
// };

// const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState();

//   useEffect(() => {
//     const fetchMe = async () => {
//       try {
//         const response = await api.get("/api/me");
//         setToken(response.data.accessToken);
//       } catch {
//         setToken(null);
//       }
//     };

//     fetchMe();
//   }, []);

//   useLayoutEffect(() => {
//     const authInterceptor = api.interceptors.request.use((config) => {
//       config.headers.Authorization = !config._retry && token ? `Bearer ${token}` : config.headers.Authorization;
//       return config;
//     });

//     return () => {
//       api.interceptors.request.eject(authInterceptor);
//     };
//   }, [token]);

//   useLayoutEffect(() => {
//     const refreshInterceptor = api.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const originalRequest = error.config;

//         if (error.response.status === 403 && error.response.data.message === "Unauthorized") {
//           try {
//             const response = await api.get("/api/refreshToken");
//             setToken(response.data.accessToken);

//             originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
//             originalRequest._retry = true;

//             return api(originalRequest);
//           } catch {
//             setToken(null);
//           }
//         }

//         return Promise.reject(error);
//       },
//     );

//     return () => {
//       api.interceptors.response.eject(refreshInterceptor);
//     };
//   }, []);
// };

// export const withAuth =
//   (...data) =>
//   async (config) => {
//     const token = config.headers.Authorization?.split(" ")[1];

//     // Verifies access token if present
//     const verified = token ? await verifyToken(token) : false;

//     // Returns 403 if token is invalid and auth is enabled
//     if (env.USE_AUTH && !verified) {
//       return [403, { message: "Unauthorized" }];
//     }

//     // Calls the original mock function
//     return typeof data[0] === "function" ? data[0](config) : data;
//   };

// // Verifies a JWT token
// export const verifyToken = async (token, options = undefined) => {
//   try {
//     const verification = await jose.jwtVerify(token, jwtSecret);
//     return options?.returnPayload ? verification.payload : true;
//   } catch {
//     return false;
//   }
// };
