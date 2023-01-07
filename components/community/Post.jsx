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
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. In vitae
        dolorem odio eos earum facere eum blanditiis inventore amet
        exercitationem? Fuga sed quibusdam repellat ratione quisquam
        consequuntur, ex dignissimos ullam.
      </LongText>
    </RowWrapper>
    <PostInput />
  </PostWrapper>
);

export default Post;
