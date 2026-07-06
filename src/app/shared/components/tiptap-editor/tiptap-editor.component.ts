import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ElementRef,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';

@Component({
  selector: 'app-tiptap-editor',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TiptapEditorComponent),
      multi: true,
    },
  ],
  templateUrl: './tiptap-editor.component.html',
  styleUrl: './tiptap-editor.component.css',
})
export class TiptapEditorComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() placeholder: string = 'Escribe aquí...';
  @ViewChild('editorEl', { static: true }) editorEl!: ElementRef;

  editor!: Editor;
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    this.editor = new Editor({
      element: this.editorEl.nativeElement,
      extensions: [
        StarterKit,
        Underline,
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        Placeholder.configure({ placeholder: this.placeholder }),
        Table,
        TableRow,
        TableHeader,
        TableCell,
      ],
      content: '',
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        this.onChange(html === '<p></p>' ? '' : html);
        this.onTouched();
      },
    });
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
  }

  writeValue(value: string): void {
    if (this.editor && value !== undefined) {
      const current = this.editor.getHTML();
      if (current !== value) {
        this.editor.commands.setContent(value || '');
      }
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  isActive(format: string, options?: any): boolean {
    return this.editor?.isActive(format, options) ?? false;
  }

  toggle(format: string, options?: any): void {
    switch (format) {
      case 'bold':
        this.editor.chain().focus().toggleBold().run();
        break;
      case 'italic':
        this.editor.chain().focus().toggleItalic().run();
        break;
      case 'underline':
        this.editor.chain().focus().toggleUnderline().run();
        break;
      case 'bulletList':
        this.editor.chain().focus().toggleBulletList().run();
        break;
      case 'orderedList':
        this.editor.chain().focus().toggleOrderedList().run();
        break;
      case 'heading':
        this.editor
          .chain()
          .focus()
          .toggleHeading({ level: options?.level ?? 2 })
          .run();
        break;
      case 'left':
        this.editor.chain().focus().setTextAlign('left').run();
        break;
      case 'center':
        this.editor.chain().focus().setTextAlign('center').run();
        break;
      case 'right':
        this.editor.chain().focus().setTextAlign('right').run();
        break;
    }
  }

  insertTable(): void {
    this.editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  }

  addColumnBefore(): void {
    this.editor.chain().focus().addColumnBefore().run();
  }

  addColumnAfter(): void {
    this.editor.chain().focus().addColumnAfter().run();
  }

  deleteColumn(): void {
    this.editor.chain().focus().deleteColumn().run();
  }

  addRowBefore(): void {
    this.editor.chain().focus().addRowBefore().run();
  }

  addRowAfter(): void {
    this.editor.chain().focus().addRowAfter().run();
  }

  deleteRow(): void {
    this.editor.chain().focus().deleteRow().run();
  }

  deleteTable(): void {
    this.editor.chain().focus().deleteTable().run();
  }

  isTableActive(): boolean {
    return this.editor?.isActive('table') ?? false;
  }
}
