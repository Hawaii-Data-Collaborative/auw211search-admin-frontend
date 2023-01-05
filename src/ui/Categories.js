import './Categories.scss'

import { useEffect, useState } from 'react'
import axios from 'axios'
import _ from 'lodash'
import { Title, Toolbar, useNotify } from 'react-admin'
import { Card, CardContent, Button, IconButton, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import SaveIcon from '@mui/icons-material/Save'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { API_URL } from '../constants'

export function Categories() {
  const notify = useNotify()
  const [categories, setCategories] = useState([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    axios.get(API_URL + '/categories').then(res => setCategories(res.data))
  }, [])

  const onAddClick = () => {
    setCategories([...categories, { name: '', icon: '', children: [] }])
  }

  const onRemoveClick = i => {
    const copy = _.cloneDeep(categories)
    copy.splice(i, 1)
    setCategories(copy)
  }

  const onChange = (k, v, i) => {
    const copy = _.cloneDeep(categories)
    copy.splice(i, 1, { ...copy[i], [k]: v })
    setCategories(copy)
  }

  const onSaveClick = async () => {
    try {
      setSaving(true)
      await axios.post(API_URL + '/categories', categories).then(res => {
        notify('Saved.')
        setSaving(false)
      })
    } catch (err) {
      setSaving(false)
      notify(err.message, { type: 'error' })
    }
  }

  return (
    <div className="Categories">
      <Card sx={{ mt: 8 }}>
        <Title title="Categories" />
        <CardContent>
          <div className="list">
            {categories.map((c, i) => (
              <Category
                key={i}
                category={c}
                onChange={(...args) => onChange(...args, i)}
                onRemoveClick={() => onRemoveClick(i)}
              />
            ))}
          </div>
          <div className="actions">
            <Button color="primary" variant="contained" size="small" onClick={onAddClick} startIcon={<AddIcon />}>
              Add Category
            </Button>
          </div>
          <div className="toolbar-wrapper">
            <Toolbar>
              <Button
                color="primary"
                variant="contained"
                onClick={onSaveClick}
                disabled={saving}
                startIcon={<SaveIcon />}
              >
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </Toolbar>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Category({ category, onChange, onRemoveClick }) {
  const [show, setShow] = useState(false)

  const onAddChildClick = () => {
    onChange('children', [...category.children, { name: '', params: '' }])
  }

  const onRemoveChildClick = i => {
    const copy = [...category.children]
    copy.splice(i, 1)
    onChange('children', copy)
  }

  const onChildChange = (k, v, i) => {
    const copy = [...category.children]
    const child = copy[i]
    copy.splice(i, 1, { ...child, [k]: v })
    onChange('children', copy)
  }

  return (
    <div className="Category">
      <div className="top">
        <IconButton onClick={() => setShow(!show)}>
          {show ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
        </IconButton>
        <span className="cname">{category.name}</span>
        <Button color="warning" variant="outlined" size="small" onClick={onRemoveClick} startIcon={<RemoveIcon />}>
          Remove
        </Button>
      </div>
      {show ? (
        <div className="body">
          <TextField label="Name" value={category.name} onChange={e => onChange('name', e.target.value)} fullWidth />
          <TextField label="Icon" value={category.icon} onChange={e => onChange('icon', e.target.value)} fullWidth />
          <div className="subcategories">
            <div className="header">Subcategories</div>
            <div className="sublist">
              {category.children.map((child, i) => (
                <Subcategory
                  key={i}
                  category={child}
                  onChange={(...args) => onChildChange(...args, i)}
                  onRemoveClick={() => onRemoveChildClick(i)}
                />
              ))}
            </div>
          </div>
          <div className="actions">
            <Button color="primary" variant="outlined" size="small" onClick={onAddChildClick} startIcon={<AddIcon />}>
              Add Subcategory
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function Subcategory({ category, onChange, onRemoveClick }) {
  return (
    <div className="Subcategory">
      <TextField
        label="Name"
        value={category.name}
        onChange={e => onChange('name', e.target.value)}
        size="small"
        fullWidth
      />
      <TextField
        label="URL Parameters (taxonomy codes, etc.)"
        value={category.params}
        onChange={e => onChange('params', e.target.value)}
        size="small"
        minRows={3}
        multiline
        fullWidth
      />
      <Button
        color="warning"
        variant="outlined"
        size="small"
        onClick={onRemoveClick}
        startIcon={<RemoveIcon />}
        sx={{ mt: 1 }}
      >
        Remove
      </Button>
    </div>
  )
}
