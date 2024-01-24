import React from "react";

function SingleComment({
  owner,
  content,
  ellipsis = false,
}: {
  owner: string;
  content: string;
  ellipsis?: boolean;
}) {
  return (
    <div>
      <div className="flex gap-x-2">
        <div className="w-[40px] h-[40px] rounded-md flex items-center justify-center">
          <img
            loading="lazy"
            src="https://api.dicebear.com/7.x/shapes/svg?radius=10&size=50"
            alt={`${owner} avatar`}
          />
        </div>
        <div>
          <p>{owner.slice(0, 5)}...</p>
          <p className="mt-1">
            {ellipsis ? (
              <>
                {content.length > 200
                  ? `${content.substring(0, 200)}...`
                  : content}{" "}
                {content.length > 200 && <span>see more</span>}
              </>
            ) : (
              content
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SingleComment;
