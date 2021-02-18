import authenticatedRequest from "../libs/authRequest";

export default async function protectedRequest(ctx, redirectUrl) {
  const result = await authenticatedRequest(ctx, "/user");

  if (!result || result.message) {
    return {
      redirect: {
        destination: redirectUrl,
        permanent: false,
      },
    };
  } else return { auth: true };
}
