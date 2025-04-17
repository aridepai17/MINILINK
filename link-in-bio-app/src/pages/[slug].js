export async function getServerSideProps({ params }) {
  const { slug } = params;

  const connectDB = (await import("@/lib/connectDB")).default;
  const userModel = (await import("@/model/userModel")).default;

  await connectDB();

  const user = await userModel.findOne({ "links.shortUrl": slug });

  if (!user) {
    return {
      notFound: true,
    };
  }

  const link = user.links.find((l) => l.shortUrl === slug);

  if (!link || !link.url) {
    return {
      notFound: true,
    };
  }

  return {
    redirect: {
      destination: link.url,
      permanent: false,
    },
  };
}

export default function RedirectPage() {
  return null;
}
