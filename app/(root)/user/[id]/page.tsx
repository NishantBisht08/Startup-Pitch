import { auth } from "@/auth";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import React from "react";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserStartups from "@/components/UserStartups";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

  if (!user) return notFound();

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>

          <Image
            src={user.image}
            alt={user.name}
            width={220}
            height={220}
            className="profile_image"
          />

          <p className="text-30-extrabold mt-7 text-center">@{user.username}</p>
          <p className="mt-1 text-center text-14-normal">
            {user.bio ? `@{user.bio}` : ""}
          </p>
        </div>

        <div className="flex flex-1 flex-col gap-5 lg:mt-5">
          <p className="text-30-bold">
            {session?.id === id ? "Your " : "All "}Startups
          </p>
          <ul className="card_grid-sm">
            <UserStartups id={id} />
          </ul>
        </div>
      </section>
    </>
  );
};

export default page;
