'use client'
import { FundDisbursementBtnIcon } from '@/pattern/common/atoms/icons/fund-disbursement-wallet-btn-icon'
import ButtonWithIcon from '@/pattern/common/molecules/controls/button-with-icon'
import { show } from '@ebay/nice-modal-react'
import FundDisbursementWalletModal from '../organisms/fund-disbursement-wallet-modal'

const FundDisbursementWalletBtn = () => {

  const handleFundDisbursementWallet = () => {
    show(FundDisbursementWalletModal)
  }
  return (
    <ButtonWithIcon
      prefixIcon={<FundDisbursementBtnIcon />}
      variant='secondary'
      size='sm'
      className='min-w-[190px] w-fit h-[45px] bg-[hsla(215,100%,94%,1)] text-[1.125rem] text-secondary hover:bg-[hsla(215,100%,94%,1)] rounded-[6px]'
      onClick={handleFundDisbursementWallet}
    >
      Fund wallet
    </ButtonWithIcon>
  )
}

export default FundDisbursementWalletBtn
