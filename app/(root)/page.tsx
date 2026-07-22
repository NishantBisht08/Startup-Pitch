import { SearchParams } from "next/dist/server/request/search-params";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import { Startup, Author } from "@/sanity/types";
import { StartupCardType } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
// export type StartupCardType = Omit<Startup, "author"> & { author?: Author };

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();
  console.log(`Session id: ${session?.id}`);

  // const posts = await client.fetch(STARTUP_QUERY);
  const { data: posts } = await sanityFetch({ query: STARTUP_QUERY, params });

  console.log(JSON.stringify(posts, null, 2));

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch your Startup, <br /> Connect with Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search Results for "${query}"` : "All Startups"}
        </p>
        <ul className="card_grid mt-7">
          {posts.length > 0 ? (
            posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className="no-results">No Startups Found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}

// const posts = [
//   {
//     _createdAt: new Date(),
//     views: 55,
//     author: { _id: 1, name: "Anubhav" },
//     _id: 101,
//     description: "This is a description",
//     image:
//       "https://plus.unsplash.com/premium_photo-1661962812180-b9f7dd4f85cf?q=80&w=1196&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     category: "Robots",
//     title: "We Robots",
//   },
// ];
