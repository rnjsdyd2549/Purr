import React, {
  useCallback,
  ChangeEvent,
  useState,
  useRef,
  useEffect,
} from 'react';
import imageResize from '../homepage/ImageResize';
import { setMyPlant } from '../../api/myPage';
import { useRecoilValue } from 'recoil';
import { validLogin } from '../../api';
import { useNavigate } from 'react-router-dom';
import { deleteMyPlant } from '../../api/myPage';

type ListProps = {
  id: number;
  checked: number;
  image: string[];
  plantName: string[];
  setMyList: any;
  myList: any;
  ChangList: any;
  deleteList: any;
};

const UploadList = ({
  id,
  checked,
  image,
  plantName,
  setMyList,
  myList,
  ChangList,
  deleteList,
}: ListProps) => {
  const navigate = useNavigate();
  const IMAGEROOT = './img/tree.png';
  const isLogin = useRecoilValue(validLogin);
  const [planttitle, setPlantTitle] = useState<string>('');
  const [edit, setEdit] = useState(false);
  const inputRef: any = useRef<HTMLInputElement | null>(null);

  const onClickFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles: File[] = [];

      selectFiles = e.target?.files;

      const target = selectFiles[0].name;
      const file_kind = target.lastIndexOf('.');
      const file_name = target.substring(file_kind + 1, target.length);
      const file_type = file_name.toLowerCase();

      const check_file_type = ['jpg', 'gif', 'png', 'jpeg', 'bmp'];

      if (check_file_type.indexOf(file_type) === -1) {
        alert('사진 파일만 업로드 가능합니다');
        return;
      }

      imageResize({
        file: selectFiles[0],
        maxSize: 400,
      })
        .then(res => {
          setImage(res);
          console.log('클릭댐');
        })
        .catch(function (err) {
          console.error(err);
        });
    },
    [],
  );

  const setImage = (res: any) => {
    const imageFile = res;
    const NewImage = myList;
    NewImage[id - 1].image = imageFile[1];
    setMyList(NewImage);
    ChangList(imageFile[1], 'image', id - 1);
  };

  const handleDelete = () => {
    const user = isLogin?.username;
    deleteList(id);
    deleteMyPlant(user, id).then(res => console.log(res));
  };

  const handleInput = (e: any) => {
    const name = e.target.value;
    setPlantTitle(name);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      checkName();
    }
  };

  const editName = () => {
    setEdit(false);
  };

  const checkName = () => {
    const user = isLogin?.username;
    const NewName = myList;
    NewName[id - 1].name = planttitle;
    const postImage = image[id - 1];
    setMyList(NewName);
    ChangList(planttitle, 'name', id - 1);
    setMyPlant(user, postImage, planttitle, id).then(data => console.log(data));
    setEdit(true);
  };

  useEffect(() => {
    if (!isLogin) {
      alert('로그인 후 이용하실 수 있습니다.');
      navigate('/account');
    }
    if (plantName[id - 1] !== '없음') {
      setEdit(true);
    } else {
      setEdit(false);
    }
    return;
  }, []);

  useEffect(() => {
    if (inputRef.current !== null) inputRef.current.focus();
    return;
  });

  return (
    <>
      <li className="mb-2">
        {image[id - 1] !== IMAGEROOT ? (
          <div className="flex justify-between md:justify-between">
            <div className="flex flex-row items-end w-40 h-6 lg:w-48">
              <span className="w-14">{id}.이름 : </span>
              {edit === false || plantName[id - 1] === '없음' ? (
                <input
                  // type="text"
                  onChange={handleInput}
                  value={planttitle}
                  onKeyPress={handleKeyPress}
                  placeholder=" 이름 입력"
                  className="w-20 h-6 pl-2 border border-gray-200 resize-none lg:w-28 rounded-xl"
                  ref={inputRef}
                ></input>
              ) : (
                <span
                  className={` w-20 lg:w-28 h-6 overflow-hidden text-ellipsis whitespace-nowrap  ${
                    checked === id ? `text-green-500` : null
                  }`}
                >
                  {plantName[id - 1]}
                </span>
              )}
            </div>
            <div>
              {edit === false || plantName[id - 1] === '없음' ? (
                <div>
                  <button className="bg-sky-400 " onClick={() => checkName()}>
                    확인
                  </button>
                </div>
              ) : (
                <div>
                  <button className="bg-green-400 " onClick={() => editName()}>
                    수정
                  </button>
                  <button
                    className="bg-red-400 "
                    onClick={() => handleDelete()}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-between md:justify-between">
            <span>{id}. 파일없음</span>
            <input
              type="file"
              id={String(id)}
              style={{ display: 'none' }}
              multiple={true}
              accept="image/*"
              onChange={onClickFiles}
            />
            <label
              className="text-white bg-green-400 rounded-md"
              htmlFor={String(id)}
            >
              파일 선택
            </label>
          </div>
        )}
      </li>
    </>
  );
};

export default UploadList;
