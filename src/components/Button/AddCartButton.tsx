import { CirclePlus } from 'lucide-react'
import Button from './index.tsx'

const AddCartButton = () => {
  return (
    <Button type="button" title="Adicionar ao carrinho">
      <CirclePlus /> Adicionar ao Carrinho
    </Button>
  )
}

export default AddCartButton
