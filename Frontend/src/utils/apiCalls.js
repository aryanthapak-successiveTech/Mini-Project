import { REQUEST_URL } from "./Constant";

export const fetchBookDetails = async (page, searchTerm, accessToken) => {
  const response = await fetch(
    `${REQUEST_URL}/books?search=${searchTerm}&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const fetchRequestDetails = async (accessToken) => {
  const response = await fetch(`${REQUEST_URL}/issueBook/checkRequests`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  return data;
};

export const postBookRequest = async (accessToken, requestData) => {
  const response = await fetch(`${REQUEST_URL}/issueBook/Approve`, {
    method: "POST",
    body: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const getStudentBookHistory = async (enrollmentNo, accessToken) => {
  const response = await fetch(`${REQUEST_URL}/issuedBooks`, {
    method: "POST",
    body: JSON.stringify({ enrollmentNo }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const getUserProfileDetails = async (accessToken) => {
  const response = await fetch(`${REQUEST_URL}/user/profile`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  const userData = await response.json();

  return userData;
};

export const userSignup = async (data) => {
  const response = await fetch(`${REQUEST_URL}/user/Signup`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const getBookDetails = async (id, accessToken) => {
  const response = await fetch(`${REQUEST_URL}/books/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const addOrEditBookDetails = async (
  requestUrl,
  requestMethod,
  formData,
  accessToken
) => {
  const response = await fetch(requestUrl, {
    method: requestMethod,
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const reIssueBook = async (id, accessToken) => {
  const response = await fetch(
    `${REQUEST_URL}/issuedBooks/re-issue-book?id=${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response;
};

export const returnBook = async (id, accessToken, fine) => {
  const response = fetch(`${REQUEST_URL}/issuedBooks/return?id=${id}`, {
    method: "POST",
    body: JSON.stringify({ fine: fine }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const getStatistics = async (accessToken) => {
  const response = await fetch(
    `${REQUEST_URL}/issuedBooks/statistics?year=2025`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response;
};

export const requestBook = async (accessToken, data) => {
  const response = await fetch(`${REQUEST_URL}/issueBook/requestBook`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const deleteBook = async (id, accessToken) => {
  const response = await fetch(`${REQUEST_URL}/books/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const getUserRequests = async (accessToken) => {
  const response = await fetch(`${REQUEST_URL}/user/requests`, {
    methood: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const addBookReview = async (accessToken, data) => {
  const response = await fetch(`${REQUEST_URL}/reviews`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const getBookReviews = async (accessToken,bookId,currentPage) => {
  const response = await fetch(
    `${REQUEST_URL}/reviews/${bookId}?page=${currentPage}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response;
};
