import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Flex,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody p="0" maxW="900px" maxH="600px" bg="pGray.900">
          <Image w="100%" h="100%" src={imgUrl} />
        </ModalBody>

        <ModalFooter bg="pGray.800">
          <Link href={imgUrl} target="_blank">Abrir original</Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
