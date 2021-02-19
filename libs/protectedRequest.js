import requestWithCredentials from "../libs/authRequest";

export default async function protectedRequest(ctx, redirectUrl) {
  const result = await requestWithCredentials(ctx, "/user");

  if (!result || result.message) {
    return {
      redirect: {
        destination: redirectUrl,
        permanent: false,
      },
    };
  } else return { auth: true };
}
