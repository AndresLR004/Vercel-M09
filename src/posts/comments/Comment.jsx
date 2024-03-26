import React from "react";
import { useContext } from "react";
import { UserContext } from "../../userContext";
import { CommentsContext } from "./commentsContext";

import TimeAgo from "react-timeago";
import catStrings from "react-timeago/lib/language-strings/ca";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

export const Comment = ({ comment }) => {
  let { authToken } = useContext(UserContext);
  let { setAdd, setRefresca, commentsCount, setCommentsCount } = useContext(CommentsContext);
  const formatter = buildFormatter(catStrings);


  let usuari = authToken.email

  const deleteComment =  (id, e) => {
    
    let revis = JSON.parse(localStorage.getItem('comments')) || []
    e.preventDefault();

    let confirma = confirm("Estas segur?");

    if (confirma) {
    

      let nouArray = revis.filter(objecte => objecte.id !== id);
      console.log(nouArray)
      localStorage.setItem('comments', JSON.stringify(nouArray));
      setRefresca(true)
        // provoca el refrescat del component i la reexecució de useEffect
       
        setAdd(true);
        setCommentsCount(commentsCount - 1);
      
    }
  };

  return (
    <div class="px-10">
      <div class="bg-white max-w-xl rounded-2xl px-10 py-8  hover:shadow-2xl transition duration-500">
        <div class="mt-4">
          <h1 class="text-lg text-gray-700 font-semibold hover:underline cursor-pointer">
            Comment de {comment.user.name}
          </h1>
                                    
          <p class="mt-4 text-md text-gray-600">{comment.comment}</p>
          <div class="flex justify-between items-center">
            <div class="mt-4 flex items-center space-x-4 py-6">
              <div class="text-sm font-semibold">
                <span class="font-normal">
                  <TimeAgo
                    date={comment.created_at}
                    formatter={formatter}
                  ></TimeAgo>{" "}
                </span>
              </div>
            </div>
            {comment.user.email === usuari ? (
              <>
                <button
                  onClick={(e) => deleteComment(comment.id, e)}
                  type="button"
                  class="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                >
                  Esborrar
                </button>

              
              </>
            ) : (
              <></>
            )}
           
          </div>
        </div>
      </div>
    </div>
  );
};
