import React from "react";
import Comment from "./Comment";
import { v4 as uuidv4 } from "uuid";

const Comments = ({ comments }) => {
  return (
    <div className="mt-[0.5rem] ">
      {comments.map(({ description, name, url, createdAt }) => (
        <Comment
          key={uuidv4()}
          url={url}
          name={name}
          description={description}
          createdAt={createdAt}
        />
      ))}
    </div>
  );
};

export default Comments;


