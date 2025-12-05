import { AddIcon, SearchIcon } from '@sanity/icons'
import {
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Grid,
  Text,
  TextInput
} from '@sanity/ui'
import { randomKey } from '@sanity/util/content'
import { useCallback, useState } from 'react'
import type { ArrayOfObjectsInputProps, ObjectSchemaType } from 'sanity'

interface ModuleType {
  name: string
  title?: string
  description?: string
}

interface ModuleCardProps {
  module: ModuleType
  onClick: () => void
}

interface SelectModuleModalProps {
  modules: ModuleType[]
  onClose: () => void
  onItemAppend: (item: { _type: string; _key: string }) => void
}

interface AddModuleButtonProps extends Omit<ArrayOfObjectsInputProps, 'onItemAppend'> {
  schemaType: ArrayOfObjectsInputProps['schemaType'] & {
    of: ObjectSchemaType[]
  }
  onItemAppend: (item: { _type: string; _key: string }) => void
}

const ModuleCard = ({ module, onClick }: ModuleCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      padding={[3, 3, 4]}
      radius={2}
      shadow={isHovered ? 2 : 1}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      tone='default'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Flex gap={4} direction='column'>
        <Card
          radius={2}
          shadow={1}
          style={{
            position: 'relative',
            aspectRatio: '16 / 9',
            backgroundColor: '#1a1a2e',
            backgroundImage: `url(/modules/${module.name}.svg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <Flex gap={3} direction='column'>
          <Text size={2} weight='medium'>
            {module.title || module.name}
          </Text>
          <Text size={1} muted>
            {module.description || ''}
          </Text>
        </Flex>
      </Flex>
    </Card>
  )
}

const SelectModuleModal = ({
  modules,
  onClose,
  onItemAppend
}: SelectModuleModalProps) => {
  const [searchValue, setSearchValue] = useState('')

  const handleModuleClick = useCallback(
    (module: ModuleType) => {
      onItemAppend({
        _type: module.name,
        _key: randomKey(12)
      })
      onClose()
    },
    [onItemAppend, onClose]
  )

  const filteredModules = modules.filter(module => {
    const search = searchValue.toLowerCase()
    return (
      module.title?.toLowerCase().includes(search) ||
      module.name.toLowerCase().includes(search) ||
      module.description?.toLowerCase().includes(search)
    )
  })

  // Extract category from module name (handles both "cta.default" and "heroDefault" patterns)
  const getCategory = (name: string): string => {
    // First check for dot notation (e.g., "cta.default" -> "cta")
    if (name.includes('.')) {
      return name.split('.')[0]
    }
    // Otherwise extract camelCase prefix (e.g., "heroDefault" -> "hero", "blogFeaturedPost" -> "blog")
    const match = name.match(/^([a-z]+)/)
    return match ? match[1] : 'other'
  }

  // Group modules by category
  const groupedModules = filteredModules.reduce<Record<string, ModuleType[]>>((acc, module) => {
    const category = getCategory(module.name)
    if (!acc[category]) acc[category] = []
    acc[category].push(module)
    return acc
  }, {})

  const categoryOrder = [
    'hero',
    'features',
    'pricing',
    'testimonials',
    'cta',
    'socialProof',
    'team',
    'logo',      // logoCloud* modules extract as "logo"
    'faq',
    'gallery',
    'blog',      // blogFeatured*, blogGrid, etc. extract as "blog"
    'form'
  ]

  return (
    <Dialog
      header='Add Module'
      id='module-picker-dialog'
      onClose={onClose}
      zOffset={1000}
      width={2}
    >
      <Box
        padding={4}
        style={{ borderBottom: '1px solid var(--card-border-color)' }}
      >
        <TextInput
          fontSize={2}
          onChange={event => setSearchValue(event.currentTarget.value)}
          padding={[3, 3, 4]}
          radius={2}
          placeholder='Search modules...'
          value={searchValue}
          autoFocus
          icon={SearchIcon}
        />
      </Box>
      <Box padding={4} style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        {categoryOrder.map(category => {
          const categoryModules = groupedModules[category]
          if (!categoryModules || categoryModules.length === 0) return null

          const categoryTitles: Record<string, string> = {
            hero: 'Hero Sections',
            features: 'Features',
            pricing: 'Pricing',
            testimonials: 'Testimonials',
            cta: 'Call to Action',
            socialProof: 'Social Proof',
            team: 'Team',
            logo: 'Logo Cloud',
            faq: 'FAQ',
            gallery: 'Gallery',
            blog: 'Blog',
            form: 'Forms'
          }
          const categoryTitle = categoryTitles[category] || category.charAt(0).toUpperCase() + category.slice(1)

          return (
            <Box key={category} marginBottom={5}>
              <Text size={1} weight='semibold' muted style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {categoryTitle}
              </Text>
              <Grid columns={[1, 2, 3]} gap={4} marginTop={3}>
                {categoryModules.map(module => (
                  <ModuleCard
                    key={module.name}
                    module={module}
                    onClick={() => handleModuleClick(module)}
                  />
                ))}
              </Grid>
            </Box>
          )
        })}
      </Box>
    </Dialog>
  )
}

const AddModuleButton = (props: AddModuleButtonProps) => {
  const [open, setOpen] = useState(false)

  const onClose = useCallback(() => setOpen(false), [])
  const onOpen = useCallback(() => setOpen(true), [])

  const modules: ModuleType[] = props.schemaType.of.map((type: ObjectSchemaType) => ({
    name: type.name,
    title: type.title,
    description: (type as ObjectSchemaType & { description?: string }).description
  }))

  return (
    <Grid columns={1} gap={2}>
      <Button
        style={{ cursor: 'pointer' }}
        text='Add Module'
        icon={AddIcon}
        onClick={onOpen}
        mode='ghost'
        tone='primary'
      />

      {open && (
        <SelectModuleModal
          modules={modules}
          onClose={onClose}
          onItemAppend={props.onItemAppend}
        />
      )}
    </Grid>
  )
}

export function ModulePickerInput(props: ArrayOfObjectsInputProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return props.renderDefault({ ...props, arrayFunctions: AddModuleButton as any })
}

export default ModulePickerInput
