import {memo, useState, type ReactNode, useCallback} from 'react';
import {classNames} from '@/shared/lib/classNames';
import {Card} from '@/shared/ui/Card/Card';
import {VStack} from '@/shared/ui/Stack/VStack/VStack';
import {Text} from '@/shared/ui/Text/Text';
import {StarRating} from '@/shared/ui/StarRating/StarRating';
import {Modal} from '@/shared/ui/Modal/Modal';
import {Input} from '@/shared/ui/Input/Input';
import {useTranslation} from 'react-i18next';
import {HStack} from '@/shared/ui/Stack/HStack/HStack';
import {Button} from '@/shared/ui/Button/Button';
import {BrowserView, MobileView} from 'react-device-detect';
import {Drawer} from '@/shared/ui/Drawer/Drawer';

type RatingCardProps = {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
};

export const RatingCard = memo((props: RatingCardProps): ReactNode => {
    const {className = '', title, feedbackTitle, hasFeedback,
        onAccept, onCancel} = props;

    const {t} = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(0);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback((selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);
        if (hasFeedback) {
            setIsModalOpen(true);
        } else {
            onAccept?.(selectedStarsCount);
        }
    }, [hasFeedback, onAccept]);

    const acceptHandle = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandle = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount);
    }, [onAccept, starsCount]);

    const modalContent = (
        <VStack max gap='32'>
            <Text title={feedbackTitle}/>
            <Input
                value={feedback}
                onChange={setFeedback}
                placeholder={t('Ваш отзыв')}/>
            <HStack max gap='16' justify='end'>
                <Button onClick={cancelHandle}>
                    {t('Закрыть')}
                </Button>
                <Button onClick={acceptHandle}>
                    {t('Отправить')}
                </Button>
            </HStack>
        </VStack>
    );

    return <Card className={classNames('', {}, [className])}>
        <VStack align='center' gap='8'>
            <Text title={title}/>
            <StarRating size={40} onSelect={onSelectStars} />
        </VStack>
        <BrowserView>
            <Modal isOpen={isModalOpen} lazy onClose={cancelHandle}>
                {modalContent}
            </Modal>
        </BrowserView>
        <MobileView>
            <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
                {modalContent}
            </Drawer>
        </MobileView>
    </Card>;
});
