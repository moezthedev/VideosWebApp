import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css"

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const apiKey = 'AIzaSyBfgOUlPxOrWvqmMTaTbR-XibZybQLrFJ0'; // Replace with your YouTube Data API key

        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}`
        );

        if (response.status === 200) {
          const data = response.data;
          const comments = data.items.map((item) => ({
            id: item.id,
            author: item.snippet.topLevelComment.snippet.authorDisplayName,
            text: item.snippet.topLevelComment.snippet.textDisplay,
            profileUrl: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
            publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
            replies: item.replies ? item.replies.comments.map((reply) => ({
              id: reply.id,
              author: reply.snippet.authorDisplayName,
              text: reply.snippet.textDisplay,
              profileUrl: reply.snippet.authorProfileImageUrl,
              publishedAt: reply.snippet.publishedAt
            })) : [],
            isReplyOpen: false // Initialize the open state of replies to false
          }));
          setComments(comments);
        } else {
          console.log(`Request failed with status code ${response.status}`);
        }
      } catch (error) {
        console.log(`An error occurred: ${error}`);
      }
    };

    fetchComments();
  }, [videoId]);

  function getTimeAgo(timestamp) {
    // ... Function to calculate time ago
  }

  const toggleReplyOpen = (commentId) => {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isReplyOpen: !comment.isReplyOpen // Toggle the open state of replies
          };
        }
        return comment;
      });
    });
  };

  return (
    <div className="comments-container">
      <h2>Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <div className="comment-header">
            <img src={comment.profileUrl} alt="Profile" className="profile-image" />
            <p className="comment-author">{comment.author}</p>
            <p className="comment-published">{getTimeAgo(comment.publishedAt)}</p>
          </div>
          <p className="comment-text">{comment.text}</p>
          <button className="reply-button" onClick={() => toggleReplyOpen(comment.id)}>
            {comment.isReplyOpen ? 'Close Replies' : 'Open Replies'}
          </button>
          {comment.isReplyOpen && (
            <div className="replies">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="reply">
                  <div className="reply-header">
                    <img src={reply.profileUrl} alt="Profile" className="profile-image" />
                    <p className="reply-author">{reply.author}</p>
                    <p className="reply-published">{getTimeAgo(reply.publishedAt)}</p>
                  </div>
                  <p className="reply-text">{reply.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Comments;
