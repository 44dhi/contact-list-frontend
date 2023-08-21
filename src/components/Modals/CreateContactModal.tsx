import { Card, IconButton, Modal, Typography } from '@mui/material'
import React from 'react'
import styles from './ModalStyles.module.scss'
import { Close } from '@mui/icons-material'

interface Props {
  open: boolean
}

function CreateContactModal({open}: Props) {
  return (
    <Modal open={open} disableAutoFocus>
      <Card className={styles['modal-card-create']}>
        <IconButton className={styles['close']}>
          <Close />
        </IconButton>
        <Typography variant='h4'>Create Contact</Typography>
      </Card>
    </Modal>
  )
}

export default CreateContactModal