import { API_KEY, url } from "const";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

type Content = {
  createdAt: string;
  image: {
    url: string;
  };
  title: string;
  writer: string;
  date: string;
  id: string;
  publishedAt: string;
  updatedAt: string;
};

type Res = {
  contents: Content[];
  totalCount: number;
  offset: number;
  limit: number;
};

export function Blog() {
  const router = useRouter();

  const refetch = (v: any) => {
    request(v.target.value);
  };

  const [numbers, setNumbers] = useState<{
    limit: number;
    totalCount: number;
  }>({
    limit: 1,
    totalCount: 1,
  });

  const [bodies, setBodies] = useState<
    {
      image: {
        url: string;
      };
      title: string;
      writer: string;
      date: string;
      id: string;
    }[]
  >([]);

  const request = async (offsetNum?: number) => {
    const res = await fetch(url(`limit=9&offset=${offsetNum ?? 0}`), {
      headers: {
        "X-API-KEY": API_KEY,
      },
    });
    const json = (await res.json()) as Res;

    let reformatt = json.contents.map((obj) => {
      return {
        image: obj.image,
        title: obj.title,
        writer: obj.writer,
        date: obj.date,
        id: obj.id,
      };
    });

    setNumbers({
      limit: json.limit,
      totalCount: json.totalCount,
    });
    setBodies(reformatt);
  };

  useEffect(() => {
    request();
  }, []);

  if (bodies === []) {
    return (
      <>
        <Title>ブログ</Title>
        <LoaderCircle></LoaderCircle>
      </>
    );
  }
  const transitionPage = (v: { id: string }) => {
    router.push(`/blogs/[id]`, `/blogs/${v.id}`);
  };
  return (
    <Box>
      {bodies.map((v, i) => (
        <div key={i}>
          <Item>
            <BlogImage
              onClick={() => {
                transitionPage(v);
              }}
            >
              <ImageItem src={v.image.url} alt="ブログサムネイル" />
            </BlogImage>
            <BlogTitle
              onClick={() => {
                transitionPage(v);
              }}
            >
              {v.title}
            </BlogTitle>
            <BlogBottom>
              <BlogDate>{v.date}</BlogDate>
              <BlogWriter>{v.writer}</BlogWriter>
            </BlogBottom>
          </Item>
        </div>
      ))}
      <PageBtn>
        {[...Array(Math.ceil(numbers.totalCount / numbers.limit))].map(
          (_, i) => (
            <div key={i}>
              <Btn value={i * 9} onClick={refetch}>
                {i + 1}
              </Btn>
            </div>
          )
        )}
      </PageBtn>
    </Box>
  );
}

const Title = styled.div`
  color: blue;
  text-align: center;
  font-size: 2.5rem;
`;

const Box = styled.div`
  width: 100%;
  padding: 5% 10%;
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.div`
  margin: 0 8px 60px 8px;
  width: 250px;
  height: 350px;
  border: 3px solid blue;
  border-radius: 15px;
  padding: 5%;
  box-shadow: 0 5px 15px 0 gray;
`;

const BlogImage = styled.div`
  width: 100%;
  height: 180px;
  cursor: pointer;
`;

const ImageItem = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
  text-align: center;
`;

const BlogTitle = styled.div`
  padding-top: 4%;
  font-size: 1.2rem;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

const BlogDate = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
`;

const BlogWriter = styled.div`
  font-size: 0.7rem;
  background-color: pink;
  color: white;
  padding: 2%;
  border-radius: 10px;
  text-align: center;
  width: 40%;
`;

const BlogBottom = styled.div`
  padding-top: 5%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  cursor: default;
`;

const PageBtn = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 20% 8% 20%;
  justify-content: center;
  text-align: center;
`;

const Btn = styled.button`
  margin: 0 5px;
  background-color: white;
  color: blue;
  width: 20px;
  border: none;
  cursor: pointer;
  :focus {
    outline: none;
  }
  :hover {
    color: yellow;
  }
`;

const loaderCircle = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;

const LoaderCircle = styled.div`
  border-radius: 50%;
  color: blue;
  font-size: 0.8rem;
  text-indent: -99999em;
  margin: 3% auto;
  position: relative;
  width: 10em;
  height: 10em;
  box-shadow: inset 0 0 0 1em;
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  :before {
    position: absolute;
    content: "";
    width: 5.2em;
    height: 10.2em;
    background: white;
    border-radius: 10.2em 0 0 10.2em;
    top: -0.1em;
    left: -0.1em;
    transform-origin: 5.1em 5.1em;
    animation: ${loaderCircle} 2s infinite ease 1.5s;
  }
  :after {
    position: absolute;
    content: "";
    width: 5.2em;
    height: 10.2em;
    background: white;
    border-radius: 0 10.2em 10.2em 0;
    top: -0.1em;
    left: 4.9em;
    transform-origin: 0.1em 5.1em;
    animation: ${loaderCircle} 2s infinite ease;
  }
`;
