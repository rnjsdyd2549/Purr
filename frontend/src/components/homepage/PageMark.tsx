import React from 'react';
import tw from 'tailwind-styled-components';

type MarkProps = {
  num: number;
  scrollIndex: number;
  setPageNum: any;
  title: string;
};

type BoxProps = {
  scrollIndex: number;
  setPageNum: any;
};

const Marker = ({ num, scrollIndex, setPageNum, title }: MarkProps) => {
  return (
    <div
      className={`w-24 h-8 cursor-default`}
      style={{
        color: scrollIndex === num ? '#64dd17' : '#bdbdbd',
        transition: 'color 0.5s',
      }}
      onClick={() => {
        setPageNum(num);
      }}
    >
      <span className="text-lg">{title}</span>
    </div>
  );
};

const PageMark = ({ scrollIndex, setPageNum }: BoxProps) => {
  return (
    <Div>
      <Container>
        <Marker
          num={1}
          scrollIndex={scrollIndex}
          setPageNum={setPageNum}
          title={'-메인-'}
        />
        <Marker
          num={2}
          scrollIndex={scrollIndex}
          setPageNum={setPageNum}
          title={'-소개글-'}
        />
        <Marker
          num={3}
          scrollIndex={scrollIndex}
          setPageNum={setPageNum}
          title={'-식물찾기-'}
        />
      </Container>
    </Div>
  );
};

export default PageMark;

const Div = tw.div`
  fixed
  z-30
  text-center
  top-2/4
  left-16
`;

const Container = tw.div`
  flex
  flex-col
  items-center
  justify-between
  w-12
  h-36
`;
