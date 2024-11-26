import {type ChangeEvent, memo, useRef, type ReactNode} from 'react';
import cls from './FileUpload.module.scss';
import {classNames} from '@/shared/lib/classNames';
import {HStack} from '../Stack/HStack/HStack';

type FileUploadProps = {
    className?: string;
    setFile: (file: File) => void;
    accept: string;
    children?: ReactNode;
    avatar?: File;
};

export const FileUpload = memo((props: FileUploadProps): ReactNode => {
    const {className = '', setFile, accept, children, avatar} = props;

    const ref = useRef<HTMLInputElement>(null);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    return <HStack max>
        <div onClick={() => ref.current?.click()} className={classNames(cls.FileUpload, {}, [className])}>
            <input accept={accept}
                ref={ref}
                style={{display: 'none'}}
                type='file'
                onChange={onChange}/>
            {children}
        </div>
        {avatar?.name ? <img className={cls.img} src={URL.createObjectURL(avatar as Blob)}/> : undefined}
    </HStack>;
});
