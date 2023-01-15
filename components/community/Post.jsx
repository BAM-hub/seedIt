import PostWrapper from './PostWrapper';
import PostHeader from './PostHeader';
import PostTitle from './PostTitle';
import PostBody from './PostBody';
import PostInput from './PostInput';
import RowWrapper from './RowWrapper';
import LongText from './LongText';

const Post = () => (
  <PostWrapper>
    <PostHeader />
    <PostTitle />
    <PostBody />
    <RowWrapper>
      <LongText>
        Black spot is a fungal disease commonly found on roses, but also on
        other flowers and fruits. While it doesn’t kill plants outright, it
        weakens them and makes them susceptible to other problems. In cool,
        moist weather, small black spots appear on foliage, which starts to turn
        yellow and eventually drops off.
      </LongText>
    </RowWrapper>
    <PostInput />
  </PostWrapper>
);

export default Post;
