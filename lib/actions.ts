"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { author } from "@/sanity/schemaTypes/author";
import { writeClient } from "@/sanity/lib/write-client";
import { start } from "repl";

// first server action

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string
) => {
  // get access to the curent session
  const session = await auth();

  // edge case
  if (!session) {
    return parseServerActionResponse({
      error: "Not Signed in",
      status: "ERROR",
    });
  }

  //   if session exists
  //   only keep the pitch and discard the rest
  const { title, category, description, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  );

  //   NOW CREATE A SLUG (we will be using a package slugify)
  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    // if we reach here successfully means we have all the details required to create a startup

    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

    // now create sanity clients to write
    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
